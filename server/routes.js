import { Router } from 'express';

const Routing = () => {
  const router = new Router();

  router.get('/events', (req, res) => {
    res.send({test: "hello world"})
  })
  return router;
};

export default Routing;
