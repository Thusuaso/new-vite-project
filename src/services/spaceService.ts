import { api } from "../services/customServices/doctorService";

export const spaceService = {
  sendTestReport(formdata:any) {
    const url = "spaces/mekmarcom/testRaporGonder";

    return api.post(url, formdata).then((res: { data: any; }) => res.data);
  },
  mekmarComFotoGonder(formdata:any) {
    return api
      .put("spaces/mekmarcom/fotoGonder", formdata)
        .then((res: { data: any; }) => res.data);
  },
};