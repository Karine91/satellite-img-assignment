import { AxiosResponse } from "axios";

import { ApiService } from "@/services/api-service";
import { ShapeData } from "@/types";

export class ShapeApiService {
  constructor(private api: ApiService) {}

  createShape(data: Omit<ShapeData, "id">): Promise<AxiosResponse<ShapeData>> {
    return this.api.post("/shape", data);
  }

  deleteShape(id: string) {
    return this.api.delete(`/shape/${id}`);
  }

  getShapes() {
    return this.api.get("/shape");
  }
}
