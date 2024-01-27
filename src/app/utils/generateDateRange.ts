export const dateRangeCategory = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  yearly: "yearly",
};

export type TDateCategory = keyof typeof dateRangeCategory;

export const getDateRange = (dateCategory: TDateCategory) => {
  const currentDate = new Date();
  let startDate: Date, endDate: Date;

  if (!dateCategory) return null;

  switch (dateCategory.toLowerCase()) {
    case dateRangeCategory.weekly:
      startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - 7);
      endDate = new Date(currentDate);
      break;
    case dateRangeCategory.daily:
      startDate = new Date(currentDate);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      endDate = new Date(currentDate);
      break;
    case dateRangeCategory.monthly:
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
      );
      endDate = new Date(currentDate);
      break;
    case dateRangeCategory.yearly:
      startDate = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      endDate = new Date(currentDate);
      break;
    default:
      return null;
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};
