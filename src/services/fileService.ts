import { api } from "@/services/customServices/mekmarFileService";

export const fileService = {
    sendProforma(file:any, teklifId:any, siparisno:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = siparisno;

    const url = "file/upload/" + teklifId + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res:any) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  
  sendInvoice(file:any, id:any, siparisno:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = siparisno;

    const url = "file/upload/" + id + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendInvoiceShipping(file: any, id: any, invoiceName: any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = invoiceName;

    const url = "file/customer/upload/" + id + "/" + dosya;

    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
 sendSample(file:any, numuneId:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = file.name;

    const url = "file/upload/numune/numuneDosya/" + numuneId + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
 offerFile(file:any, teklifId:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }

    const dosya = file.name;

    const url = "file/upload/teklif/teklifDosya/" + teklifId + "/" + dosya;

    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendOfferProforma(file: any,offerId:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //let uzanti = file.name.split('.')[1];
    const dosya = file.name;

    const url = "file/upload/teklif/proforma/" + offerId + "/" + dosya;

    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendSampleFile(file: any, offerId: any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = file.name;

    const url = "file/upload/teklif/teklifNumune/" + offerId + "/" + dosya;

    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  faturaDosyaGonder(file: any, teklifId: any, siparisno: any) {
    console.log(file)
    console.log(teklifId)
    console.log(siparisno);
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = siparisno;

    const url = "file/upload/" + teklifId + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendSupplier(file: any,po:any,document:any) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = po;

    const url = "file/tedarikci/upload/30/" + po + "/" + document;

    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  }

}