import { Role } from '../../roles/role.entity';

export interface EJwtPayload {
  id?: number;
  email?: string;
  roles?: Role[];
}
