import app from './app';
import { PORT } from './config';

app.listen(PORT, () => {
  console.info(`Express server listening on port ${PORT}`);
});
