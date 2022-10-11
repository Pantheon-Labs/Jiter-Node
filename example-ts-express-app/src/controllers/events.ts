import { Request, Response, Router } from 'express';
import { createEvent, editEvent, EventStatus, getManyEvents } from '@jiter/node';

export const eventsRouter = Router();

eventsRouter.post('/', async (req: Request, res: Response) => {
  const twentyMinutesFromNow = new Date(Date.now() + 1000 * 60 * 20);
  try {
    const createdEvent = await createEvent({
      destination: `${process.env.BASE_URL}/webhooks/jiter`,
      payload: JSON.stringify({
        action: 'buyGroceries',
        values: ['eggs', 'bacon', 'pasta', 'bread'],
      }),
      scheduledTime: twentyMinutesFromNow.toISOString(),
    });
    res.send(createdEvent);
  } catch (error) {
    console.error(error);
  }
});

eventsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const allEvents = await getManyEvents();
    res.send(allEvents);
  } catch (error) {
    console.error(error);
  }
});

eventsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedEvent = await editEvent({
      id: req.params.id,
      payload: JSON.stringify({
        action: 'returnGroceries',
        values: [{ bacon: 'Too addictive' }, { eggs: 'Break too easily' }],
      }),
      status: EventStatus.Cancelled,
    });
    res.send(updatedEvent);
  } catch (error) {
    console.error(error);
  }
});
