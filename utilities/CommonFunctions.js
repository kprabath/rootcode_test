import moment from 'moment';

export const formatDateString = date => {
  let formattedDate = null;
  let dt = new Date(date);

  formattedDate = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
    .getDate()
    .toString()
    .padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt
    .getHours()
    .toString()
    .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
};

export const formatDateString2 = date => {
  let format = 'dd/MM/yyyy HH:mm';

  return moment(date).format(format);
};
