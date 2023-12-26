import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
  DB_PASSWORD: str(),
  DB_USERNAME: str(),
  PORT: port(),
});
