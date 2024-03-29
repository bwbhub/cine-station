import publicClient from "../client/public.client.js";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediatype }) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.medias({
          mediatype,
        }),
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
