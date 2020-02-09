    const intakes = [
      {
        time: "9:15",
        pills: 1
      },
      {
        time: "15:35",
        pills: 2
      },
      {
        time: "19:00",
        pills: 2
      }
    ];

    const stock = 40;

    const weekDays = {
      monday: true,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false
    };

    const frequencyType = {
      DAILY: 'DAILY',
      EACH_OTHER_DAY: 'EACH_OTHER_DAY',
      WEEKLY: 'WEEKLY'
    };

    function calculateIntakeEndDate(intakes, stock, frequency = frequencyType.DAILY, weekDays = undefined) {
      const currentDayInMilliseconds = new Date().getTime();
      const currentSchedule = setSchedule(intakes, frequency, weekDays);
      const daysOfTreatment = countingTheNumberOfDaysOfTreatment(stock, currentSchedule);
      const millisecondsOfTreatment = convertDaysToMiliseconds(daysOfTreatment);
      const intakeEndDate = new Date(currentDayInMilliseconds + millisecondsOfTreatment);
      return intakeEndDate;
    }

    function setSchedule(intakes, frequency, weekDays = undefined) {
      let days = new Array(14).fill(null);
      let mapDays = [];
    //  set map
      if (frequency === frequencyType.WEEKLY) {
        mapDays = Object.values(weekDays);
        mapDays = [...mapDays, ...mapDays];
        
      }
    // set days
      days.forEach((_, index) => {
        if (frequency === frequencyType.DAILY) {
          days[index] = intakes;
        }

        if (frequency === frequencyType.EACH_OTHER_DAY) {
          if (index % 2 === 0) {
            days[index] = intakes;
          }
        }
        if (frequency === frequencyType.WEEKLY) {
          if (mapDays[index]) {
            days[index] = intakes;
          }
        }
      });

      return days;
    }

    function countingTheNumberOfDaysOfTreatment(stock, schedule = []) {
      let totalDays = stock;
      let indexDay = 0;
      let daysOfTreatment = 0;

      while (totalDays >= 0) {
        daysOfTreatment++;
        let summ;
        if (schedule[indexDay]) {
              summ = schedule[indexDay].reduce((acc, currentValue) => acc + currentValue.pills, 0);
              totalDays -= summ;
            }
        indexDay++;
        if (indexDay > 13) {
          indexDay = 0;
        }
      }
      return daysOfTreatment;
    }

    function convertDaysToMiliseconds(days) {
      return 1000 * 60 * 60 *24 * days;
    }

    calculateIntakeEndDate(intakes, stock, frequencyType.WEEKLY, weekDays);
