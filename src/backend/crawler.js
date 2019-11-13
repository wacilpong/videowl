import axios from "axios";
import cheerio from "cheerio";

export default () => {
  const getHtml = async () => {
    try {
      return await axios.get(
        "https://www.youtube.com/results?search_query=%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%B9%AD&sp=CAE%253D"
      );
    } catch (error) {
      throw error(error);
    }
  };

  getHtml().then(html => {
    const $ = cheerio.load(html.data);
    const $list = $("div#contents").children("ytd-video-renderer");

    // 가공하기

    return $list;
  });
};
