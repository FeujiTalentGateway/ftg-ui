import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format time correctly when hours, minutes, and seconds are present', () => {
    expect(pipe.transform('01:15:30')).toBe('1 hours 15 min 30 sec');
  });

  it('should format time correctly when only hours and minutes are present', () => {
    expect(pipe.transform('02:05:00')).toBe('2 hours 5 min');
  });

  it('should format time correctly when only minutes and seconds are present', () => {
    expect(pipe.transform('00:10:45')).toBe('10 min 45 sec');
  });

  it('should format time correctly when only seconds are present', () => {
    expect(pipe.transform('00:00:50')).toBe('50 sec');
  });

  it('should format time correctly when only hours are present', () => {
    expect(pipe.transform('03:00:00')).toBe('3 hours');
  });

  it('should format time correctly when only minutes are present', () => {
    expect(pipe.transform('00:20:00')).toBe('20 min');
  });

  it('should handle zero values correctly', () => {
    expect(pipe.transform('00:00:00')).toBe('');
  });

  it('should trim and handle extra spaces correctly', () => {
    expect(pipe.transform(' 02 : 30 : 45 ')).toBe('2 hours 30 min 45 sec');
  });
});
