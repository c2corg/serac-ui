import axios from 'axios';
import Report from '../model/report';
import { Page } from '../model/page';

const baseUrl: string = 'http://localhost:8080';

// FIXME error handling, interceptors & all
export default {
  getReports(page: number = 1): Promise<Page<Report>> {
    return axios
      .get<Page<Report>>(`${baseUrl}/xreports?page=${page - 1}`)
      .then(response => response.data);
  },

  getReport(id: string): Promise<Report> {
    return axios
      .get<Report>(`${baseUrl}/xreports/${id}`)
      .then(response => response.data);
  },

  createReport(report: Omit<Report, 'id'>): Promise<CreateResponse> {
    return axios
      .post<CreateResponse>(`${baseUrl}/xreports`, report)
      .then(response => response.data);
  },

  editReport(report: Report): Promise<void> {
    return axios
      .put<void>(`${baseUrl}/xreports/${report.id}`, report)
      .then(response => response.data);
  },

  validateReport(report: Report): Promise<void> {
    return this.editReport({ ...report, validated: true });
  },
};

export interface CreateResponse {
  id: string;
}
