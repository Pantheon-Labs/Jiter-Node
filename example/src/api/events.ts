import { Request, Response, Router } from 'express';
import { createEvent, editEvent, getEvent, getManyEvents } from '@jiter/node';
import { BuyGroceriesEvent, ReturnGroceriesEvent } from '../types';

export const events = Router();

// See https://docs.jiter.dev/docs/rest-api/get-many-events
events.get('/', async (req: Request, res: Response) => {
  try {
    const allEvents = await getManyEvents();
    res.send(allEvents);
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    res.status(error.status).json({ message, error });
  }
});

// See https://docs.jiter.dev/docs/rest-api/get-event-info
events.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await getEvent({
      id: req.params.id,
    });
    res.send(event);
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    res.status(error.status).json({ message, error });
  }
});

// See https://docs.jiter.dev/docs/rest-api/create-event
events.post('/', async (req: Request, res: Response) => {
  const twentyMinutesFromNow = new Date(Date.now() + 1000 * 60 * 20);
  try {
    const payload: BuyGroceriesEvent = {
      action: 'buyGroceries',
      items: ['eggs', 'bacon', 'pasta', 'bread'],
    };

    const createdEvent = await createEvent({
      destination: `${process.env.BASE_URL}/webhooks/jiter`,
      payload: JSON.stringify(payload),
      scheduledTime: twentyMinutesFromNow.toISOString(),
    });

    res.send(createdEvent);
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    res.status(error.status).json({ message, error });
  }
});

// See https://docs.jiter.dev/docs/rest-api/update-event
events.put('/:id', async (req: Request, res: Response) => {
  try {
    const payload: ReturnGroceriesEvent = {
      action: 'returnGroceries',
      returns: [
        { itemName: 'bacon', reason: 'Too addictive' },
        { itemName: 'eggs', reason: 'Too fragile' },
      ],
    };
    const updatedEvent = await editEvent({
      id: req.params.id,
      payload: JSON.stringify(payload),
    });
    res.send(updatedEvent);
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    res.status(error.status).json({ message, error });
  }
});
