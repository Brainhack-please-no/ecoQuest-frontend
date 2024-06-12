export interface ResponseData {
  details: Detail[];
  metrics: Metric;
}

export interface Metric {
  plastic_free_packaging: number;
  plastic_bags_used: number;
  sustainable_clothing: number;
}

export interface Detail {
  original_name: string;
  matched_name: string;
  category: string;
  quantity: string;
  price_per_unit: string;
  total_price: string;
  plastic_packaging_count: number;
  'eco-friendliness_score': number;
}
