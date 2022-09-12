import { SongPrivacy } from '../services/song';

export interface PrivacyOption {
  label: string;
  value: SongPrivacy;
}

export type SortType = 'default' | 'name_az' | 'name_za';

export const audioSpeedOptions: AudioPlaybackRateType[] = [];

export interface AudioPlaybackRateType {
  label: string;
  value: number;
  desc: string;
}

export enum ReplayMode {
  NONE,
  ALL,
  ONE,
}

export interface AlarmTimeOption {
  label: string;
  value: number;
}

export const privacyOptions: PrivacyOption[] = [
  {
    label: 'Cá nhân',
    value: 'private',
  },
  {
    label: 'Công khai',
    value: 'public',
  },
];

export const sortOptions: { label: string; value: SortType }[] = [
  {
    label: 'Mặc định',
    value: 'default',
  },
  {
    label: 'Tên bài hát (A-Z)',
    value: 'name_az',
  },
  {
    label: 'Tên bài hát (Z-A)',
    value: 'name_za',
  },
];

export const playbackRateOptions: AudioPlaybackRateType[] = [
  {
    desc: 'Bình thường',
    label: '1.0',
    value: 1.0,
  },
  {
    desc: '0.75',
    label: '0.75',
    value: 0.75,
  },
  {
    desc: '0.5',
    label: '0.5',
    value: 0.5,
  },
  {
    desc: '0.25',
    label: '0.25',
    value: 0.25,
  },
  {
    desc: '1.25',
    label: '1.25',
    value: 1.25,
  },
  {
    desc: '1.5',
    label: '1.5',
    value: 1.5,
  },
  {
    desc: '1.75',
    label: '1.75',
    value: 1.75,
  },
  {
    desc: '2.0',
    label: '2.0',
    value: 2.0,
  },
];

export const hourOptions: AlarmTimeOption[] = Array(13)
  .fill({})
  .map((_, index) => ({
    label: `${index < 10 ? `0${index}` : index} giờ`,
    value: index,
  }));

export const minuteOptions: AlarmTimeOption[] = Array(12)
  .fill({})
  .map((_, index) => ({
    label: `${index * 5 < 10 ? `0${index * 5}` : index * 5} phút`,
    value: index * 5,
  }));
