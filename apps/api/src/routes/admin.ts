import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const adminRouter = Router();

function mapOnboardingRecord(onboarding: {
  id: string;
  teamId: string;
  currentStep: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  team: {
    id: string;
    name: string;
    product: string;
    description: string;
    ownerId: string;
    createdAt: Date;
    owner: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: Date;
    };
  };
  steps: Array<{
    id: string;
    onboardingId: string;
    stepNumber: number;
    status: string;
    formData: string;
    artifacts: string;
    completedAt: Date | null;
  }>;
}) {
  return {
    ...onboarding,
    team: {
      ...onboarding.team,
      createdAt: onboarding.team.createdAt.toISOString(),
      owner: {
        ...onboarding.team.owner,
        createdAt: onboarding.team.owner.createdAt.toISOString(),
      },
    },
    steps: onboarding.steps.map((s) => ({
      ...s,
      formData: JSON.parse(s.formData),
      artifacts: JSON.parse(s.artifacts),
      completedAt: s.completedAt?.toISOString() || null,
    })),
    createdAt: onboarding.createdAt.toISOString(),
    updatedAt: onboarding.updatedAt.toISOString(),
  };
}

adminRouter.get('/skills', async (_req: Request, res: Response) => {
  try {
    const onboardings = await prisma.onboarding.findMany({
      include: {
        team: {
          include: {
            owner: {
              select: { id: true, name: true, email: true, role: true, createdAt: true },
            },
          },
        },
        steps: { orderBy: { stepNumber: 'asc' } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      success: true,
      data: onboardings.map(mapOnboardingRecord),
    });
  } catch (error) {
    console.error('Admin list skills error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

adminRouter.get('/skills/:id', async (req: Request, res: Response) => {
  try {
    const onboarding = await prisma.onboarding.findUnique({
      where: { id: req.params.id },
      include: {
        team: {
          include: {
            owner: {
              select: { id: true, name: true, email: true, role: true, createdAt: true },
            },
          },
        },
        steps: { orderBy: { stepNumber: 'asc' } },
      },
    });

    if (!onboarding) {
      res.status(404).json({ success: false, error: 'Карточка не найдена' });
      return;
    }

    res.json({ success: true, data: mapOnboardingRecord(onboarding) });
  } catch (error) {
    console.error('Admin skill detail error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});
