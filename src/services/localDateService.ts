export const localDateService =  {
  getDateString(value:any) {
    const tarih = new Date(value);

    const gun = tarih.getDate();
    const ay = tarih.getMonth();
    const yil = tarih.getFullYear();

    return gun + "-" + (ay + 1) + "-" + yil;
  },

  getStringDate(value: any) {
    const tarih = value.split("-");

    const yil = tarih[2];
    const ay = tarih[1];
    const gun = tarih[0];
    const newDate = new Date(yil, ay - 1, gun);
    return newDate;
  },

  getDataTableSum(data:any, columns:any) {
    const values = [];
    for (const col in columns) {
      let deger = 0;
      const key = columns[col];
      for (const key in data) {
        deger += data[key].columns[col];
      }

      const value = {
        key: key,
        value: deger,
      };

      values.push(value);
    }

    return values;
  }
}
