import axios from 'axios';
import Report from '../model/report';
import { Page } from '../model/page';

const baseUrl: () => string = () => {
  // a 'hack' to use environment variables to configure base URL
  // - either set by .env file
  // - or, in docker image, replace by value on NGINX startup
  const baseUrl = '$VUE_APP_BASE_URL';
  if (baseUrl.startsWith('$VUE_APP')) {
    return process.env.VUE_APP_BASE_URL || '';
  }
  return baseUrl;
};

export default {
  getReports(page: number = 1): Promise<Page<Report>> {
    return axios
      .get<Page<Report>>(`${baseUrl()}/xreports?page=${page - 1}`)
      .then(response => response.data);
  },

  getReport(id: string): Promise<Report> {
    return axios
      .get<Report>(`${baseUrl()}/xreports/${id}`)
      .then(response => response.data);
  },

  createReport(report: Omit<Report, 'id'>): Promise<CreateResponse> {
    return axios
      .post<CreateResponse>(`${baseUrl()}/xreports`, report)
      .then(response => response.data);
  },

  editReport(report: Report): Promise<void> {
    return axios
      .put<void>(`${baseUrl()}/xreports/${report.id}`, report)
      .then(response => response.data);
  },

  validateReport(report: Report): Promise<void> {
    return this.editReport({ ...report, validated: true });
  },

  deleteReport(report: Report): Promise<void> {
    return axios
      .delete<void>(`${baseUrl()}/xreports/${report.id}`)
      .then(response => response.data);
  },
};

export interface CreateResponse {
  id: string;
}
