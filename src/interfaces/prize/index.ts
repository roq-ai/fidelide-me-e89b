import { RetailerInterface } from 'interfaces/retailer';
import { GetQueryInterface } from 'interfaces';

export interface PrizeInterface {
  id?: string;
  retailer_id: string;
  name: string;
  description?: string;
  image?: string;
  stickers_required: number;
  created_at?: any;
  updated_at?: any;

  retailer?: RetailerInterface;
  _count?: {};
}

export interface PrizeGetQueryInterface extends GetQueryInterface {
  id?: string;
  retailer_id?: string;
  name?: string;
  description?: string;
  image?: string;
}
