module.exports = {
  calculateSgpa: function (resultDetails) {
    const grades = {
      S: 10,
      "A+": 9,
      A: 8.5,
      "B+": 8,
      B: 7.5,
      "C+": 7,
      C: 6.5,
      D: 6,
      P: 5,
      F: 0,
      FE: 0,
      I: 0,
    };

    let totalCredits = 0;
    let totalPoints = 0;

    for (const result of resultDetails) {
      if (
        !result.credits &&
        (result.grade == "F" || result.grade == "FE" || result.grade == "I")
      ) {
        return "N/A";
      }

      totalCredits += result.credits;
      totalPoints += result.credits * grades[result.grade];
    }

    return (totalPoints / totalCredits).toFixed(2);
  },
};