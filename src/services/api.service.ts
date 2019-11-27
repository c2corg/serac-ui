import axios from 'axios';
import Report from '../model/report';
import { Page } from '../model/page';

const baseUrl: string = 'http://localhost:8080';

// FIXME error handling, interceptors & all
export default {
  reports(page: number = 1): Promise<Page<Report>> {
    return axios
      .get<Page<Report>>(`${baseUrl}/xreports?page=${page - 1}`)
      .then(response => response.data);
  },

  report(id: string): Promise<Report> {
    return axios
      .get<Report>(`${baseUrl}/xreports/${id}`)
      .then(response => response.data);
  },
};
