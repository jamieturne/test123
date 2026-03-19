import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireAuth } from '../middleware';
import { ROADMAP_STEPS } from '@spotlight/shared';

export const onboardingsRouter = Router();

onboardingsRouter.use(requireAuth);

onboardingsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const onboardings = await prisma.onboarding.findMany({
      where: { team: { ownerId: req.session.userId } },
      include: {
        team: true,
        steps: { orderBy: { stepNumber: 'asc' } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const mapped = onboardings.map(o => ({
      ...o,
      steps: o.steps.map(s => ({
        ...s,
        formData: JSON.parse(s.formData),
        artifacts: JSON.parse(s.artifacts),
        completedAt: s.completedAt?.toISOString() || null,
      })),
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('List onboardings error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

onboardingsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.body;
    if (!teamId) {
      res.status(400).json({ success: false, error: 'Укажите команду' });
      return;
    }

    const team = await prisma.team.findFirst({
      where: { id: teamId, ownerId: req.session.userId },
    });
    if (!team) {
      res.status(404).json({ success: false, error: 'Команда не найдена' });
      return;
    }

    const onboarding = await prisma.onboarding.create({
      data: {
        teamId,
        steps: {
          create: ROADMAP_STEPS.map((step, index) => ({
            stepNumber: step.number,
            status: index === 0 ? 'active' : 'locked',
          })),
        },
      },
      include: {
        team: true,
        steps: { orderBy: { stepNumber: 'asc' } },
      },
    });

    res.json({
      success: true,
      data: {
        ...onboarding,
        steps: onboarding.steps.map(s => ({
          ...s,
          formData: JSON.parse(s.formData),
          artifacts: JSON.parse(s.artifacts),
          completedAt: s.completedAt?.toISOString() || null,
        })),
        createdAt: onboarding.createdAt.toISOString(),
        updatedAt: onboarding.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Create onboarding error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

onboardingsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const onboarding = await prisma.onboarding.findFirst({
      where: { id: req.params.id, team: { ownerId: req.session.userId } },
      include: {
        team: true,
        steps: { orderBy: { stepNumber: 'asc' } },
      },
    });

    if (!onboarding) {
      res.status(404).json({ success: false, error: 'Не найдено' });
      return;
    }

    res.json({
      success: true,
      data: {
        ...onboarding,
        steps: onboarding.steps.map(s => ({
          ...s,
          formData: JSON.parse(s.formData),
          artifacts: JSON.parse(s.artifacts),
          completedAt: s.completedAt?.toISOString() || null,
        })),
        createdAt: onboarding.createdAt.toISOString(),
        updatedAt: onboarding.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Get onboarding error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

onboardingsRouter.put('/:id/steps/:step', async (req: Request, res: Response) => {
  try {
    const stepNumber = parseInt(req.params.step);
    const { formData, artifacts, status } = req.body;

    const onboarding = await prisma.onboarding.findFirst({
      where: { id: req.params.id, team: { ownerId: req.session.userId } },
      include: { steps: { orderBy: { stepNumber: 'asc' } } },
    });

    if (!onboarding) {
      res.status(404).json({ success: false, error: 'Не найдено' });
      return;
    }

    const step = onboarding.steps.find(s => s.stepNumber === stepNumber);
    if (!step) {
      res.status(404).json({ success: false, error: 'Шаг не найден' });
      return;
    }

    if (step.status === 'locked') {
      res.status(400).json({ success: false, error: 'Шаг ещё не доступен' });
      return;
    }

    const updateData: Record<string, unknown> = {};
    if (formData !== undefined) updateData.formData = JSON.stringify(formData);
    if (artifacts !== undefined) updateData.artifacts = JSON.stringify(artifacts);
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'completed') {
        updateData.completedAt = new Date();
      }
    }

    await prisma.stepProgress.update({
      where: { id: step.id },
      data: updateData,
    });

    if (status === 'completed') {
      const stepIndex = ROADMAP_STEPS.findIndex(s => s.number === stepNumber);
      const nextStep = ROADMAP_STEPS[stepIndex + 1];

      if (nextStep) {
        const nextStepRecord = onboarding.steps.find(s => s.stepNumber === nextStep.number);
        if (nextStepRecord && nextStepRecord.status === 'locked') {
          await prisma.stepProgress.update({
            where: { id: nextStepRecord.id },
            data: { status: 'active' },
          });
        }

        await prisma.onboarding.update({
          where: { id: onboarding.id },
          data: { currentStep: nextStep.number },
        });
      } else {
        await prisma.onboarding.update({
          where: { id: onboarding.id },
          data: { status: 'completed' },
        });
      }
    }

    const updated = await prisma.onboarding.findUnique({
      where: { id: onboarding.id },
      include: { team: true, steps: { orderBy: { stepNumber: 'asc' } } },
    });

    res.json({
      success: true,
      data: {
        ...updated,
        steps: updated!.steps.map(s => ({
          ...s,
          formData: JSON.parse(s.formData),
          artifacts: JSON.parse(s.artifacts),
          completedAt: s.completedAt?.toISOString() || null,
        })),
        createdAt: updated!.createdAt.toISOString(),
        updatedAt: updated!.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Update step error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});
