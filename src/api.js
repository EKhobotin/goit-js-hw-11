import axios from 'axios';

const axiosV2 = axios.create({
  baseURL: 'https://pixabay.com',
});

export class ImgAPI {  
  static API = '40783621-48111ea33d2baaaa5d03de19e';
  static END_POINT = '/api/';
  static PER_PAGE = 40;
  constructor() {
    this.q = '';
    this.page = 1;
  }

  async fetchPics() {
    const PARAMS = new URLSearchParams({
      key: ImgAPI.API,
      q: this.q,
      page: this.page,
      per_page: ImgAPI.PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `${ImgAPI.END_POINT}?${PARAMS}`;
    const res = await axiosV2.get(url);
    return res.data;
  }
}