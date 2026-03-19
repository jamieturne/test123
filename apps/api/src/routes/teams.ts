import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireAuth } from '../middleware';

export const teamsRouter = Router();

teamsRouter.use(requireAuth);

teamsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      where: { ownerId: req.session.userId },
      include: { onboardings: { select: { id: true, currentStep: true, status: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: teams });
  } catch (error) {
    console.error('List teams error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});

teamsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, product, description } = req.body;
    if (!name || !product) {
      res.status(400).json({ success: false, error: 'Укажите название команды и продукт' });
      return;
    }
    const team = await prisma.team.create({
      data: { name, product, description: description || '', ownerId: req.session.userId! },
    });
    res.json({ success: true, data: team });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
});
