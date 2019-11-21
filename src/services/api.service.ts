import axios from 'axios';
import { Report } from '../model/report';

const baseUrl: string = 'http://localhost:8080';

// FIXME error handling, interceptors & all
export class ApiService {
  reports(): Promise<Report[]> {
    return axios
      .get<Report[]>(`${baseUrl}/reports`)
      .then(response => response.data);
  }

  report(id: string): Promise<Report> {
    return axios
      .get<Report>(`${baseUrl}/reports/${id}`)
      .then(response => response.data);
  }
}
