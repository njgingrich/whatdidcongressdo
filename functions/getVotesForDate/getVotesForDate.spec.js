const formatResponse = require("./getVotesForDate").formatResponse;
const testData = require("../../static/testing/house.json");

test("it correctly formats a valid response", () => {
  expect(formatResponse(testData)).toStrictEqual([
    {
      roll_call: 710,
      url: "http://clerk.house.gov/evs/2017/roll710.xml",
      bill: {
        bill_id: "s1532-115",
        number: "S.1532",
        sponsor_id: "T000250",
        api_uri: "https://api.propublica.org/congress/v1/115/bills/s1532.json",
        title:
          "A bill to disqualify from operating a commercial motor vehicle for life an individual who uses a commercial motor vehicle in committing a felony involving human trafficking.",
        latest_action:
          "Motion to reconsider laid on the table Agreed to without objection."
      },
      amendment: {},
      vote_type: "2/3 YEA-AND-NAY",
      question: "On Motion to Suspend the Rules and Pass",
      description: "No Human Trafficking on Our Roads Act",
      date: new Date("2017-12-21 17:11:00").toISOString(),
      results: {
        democratic: {
          yes: 172,
          no: 0,
          present: 0,
          not_voting: 21,
          majority_position: "Yes"
        },
        republican: {
          yes: 221,
          no: 0,
          present: 0,
          not_voting: 18,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 393,
          no: 0,
          present: 0,
          not_voting: 38
        },
        result: "Passed"
      }
    },
    {
      roll_call: 709,
      url: "http://clerk.house.gov/evs/2017/roll709.xml",
      bill: {
        bill_id: "hr4667-115",
        number: "H.R.4667",
        sponsor_id: "F000372",
        api_uri: "https://api.propublica.org/congress/v1/115/bills/hr4667.json",
        title:
          "Making further supplemental appropriations for the fiscal year ending September 30, 2018, for disaster assistance for Hurricanes Harvey, Irma, and Maria, and calendar year 2017 wildfires, and for other purposes.",
        latest_action: "Received in the Senate."
      },
      amendment: {},
      vote_type: "YEA-AND-NAY",
      question: "On Passage",
      description:
        "Making further supplemental appropriations for the fiscal year ending September 30, 2018, for disaster assistance for Hurricanes Harvey, Irma, and Maria, and calendar year 2017 wildfires, and for other purposes",
      date: new Date("2017-12-21 17:01:00").toISOString(),
      results: {
        democratic: {
          yes: 69,
          no: 118,
          present: 0,
          not_voting: 6,
          majority_position: "No"
        },
        republican: {
          yes: 182,
          no: 51,
          present: 0,
          not_voting: 6,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 251,
          no: 169,
          present: 0,
          not_voting: 12
        },
        result: "Passed"
      }
    },
    {
      roll_call: 708,
      url: "http://clerk.house.gov/evs/2017/roll708.xml",
      bill: {
        bill_id: "hr1370-115",
        number: "H.R.1370",
        sponsor_id: "M001157",
        api_uri: "https://api.propublica.org/congress/v1/115/bills/hr1370.json",
        title:
          "To amend the Homeland Security Act of 2002 to require the Secretary of Homeland Security to issue Department of Homeland Security-wide guidance and develop training programs as part of the Department of Homeland Security Blue Campaign, and for other purposes.",
        latest_action: "Became Public Law No: 115-96."
      },
      amendment: {},
      vote_type: "YEA-AND-NAY",
      question: "On Motion to Concur in the Senate Amendment with an Amendment",
      description:
        "Department of Homeland Security Blue Campaign Authorization Act of 2017",
      date: new Date("2017-12-21 16:53:00").toISOString(),
      results: {
        democratic: {
          yes: 14,
          no: 172,
          present: 0,
          not_voting: 7,
          majority_position: "No"
        },
        republican: {
          yes: 217,
          no: 16,
          present: 0,
          not_voting: 6,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 231,
          no: 188,
          present: 0,
          not_voting: 13
        },
        result: "Passed"
      }
    },
    {
      roll_call: 707,
      url: "http://clerk.house.gov/evs/2017/roll707.xml",
      bill: {
        bill_id: "journal-115",
        number: "JOURNAL",
        sponsor_id: null,
        api_uri: null,
        title: null,
        latest_action: null
      },
      amendment: {},
      vote_type: "YEA-AND-NAY",
      question: "On Approving the Journal",
      description: "",
      date: new Date("2017-12-21 14:26:00").toISOString(),
      results: {
        democratic: {
          yes: 66,
          no: 121,
          present: 1,
          not_voting: 5,
          majority_position: "No"
        },
        republican: {
          yes: 159,
          no: 66,
          present: 0,
          not_voting: 14,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 225,
          no: 187,
          present: 1,
          not_voting: 18
        },
        result: "Passed"
      }
    },
    {
      roll_call: 706,
      url: "http://clerk.house.gov/evs/2017/roll706.xml",
      bill: {
        bill_id: "s1393-115",
        number: "S.1393",
        sponsor_id: "C001056",
        api_uri: "https://api.propublica.org/congress/v1/115/bills/s1393.json",
        title:
          "A bill to streamline the process by which active duty military, reservists, and veterans receive commercial driver's licenses.",
        latest_action:
          "Motion to reconsider laid on the table Agreed to without objection."
      },
      amendment: {},
      vote_type: "2/3 YEA-AND-NAY",
      question: "On Motion to Suspend the Rules and Pass",
      description: "Jobs for Our Heroes Act",
      date: new Date("2017-12-21 14:19:00").toISOString(),
      results: {
        democratic: {
          yes: 187,
          no: 0,
          present: 0,
          not_voting: 6,
          majority_position: "Yes"
        },
        republican: {
          yes: 231,
          no: 0,
          present: 0,
          not_voting: 8,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 418,
          no: 0,
          present: 0,
          not_voting: 13
        },
        result: "Passed"
      }
    },
    {
      roll_call: 705,
      url: "http://clerk.house.gov/evs/2017/roll705.xml",
      bill: {
        bill_id: "hres670-115",
        number: "H.RES.670",
        sponsor_id: null,
        api_uri: null,
        title: null,
        latest_action: null
      },
      amendment: {},
      question: "On Agreeing to the Resolution",
      description:
        "Providing for consideration of the Senate Amendment to H.R. 1370, the Department of Homeland Security Blue Campaign Authorization Act of 2017; and providing for consideration of H.R. 4667, making further supplemental appropriations for FY 2018, for disaster assistance for Hurricanes and Wildfires in calendar year 2017",
      vote_type: "RECORDED VOTE",
      date: new Date("2017-12-21 14:10:00").toISOString(),
      results: {
        democratic: {
          yes: 0,
          no: 186,
          present: 0,
          not_voting: 7,
          majority_position: "No"
        },
        republican: {
          yes: 228,
          no: 2,
          present: 0,
          not_voting: 9,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 228,
          no: 188,
          present: 0,
          not_voting: 15
        },
        result: "Passed"
      }
    },
    {
      roll_call: 704,
      url: "http://clerk.house.gov/evs/2017/roll704.xml",
      bill: {
        bill_id: "hres670-115",
        number: "H.RES.670",
        sponsor_id: null,
        api_uri: null,
        title: null,
        latest_action: null
      },
      amendment: {},
      question: "On Ordering the Previous Question",
      description:
        "Providing for consideration of the Senate Amendment to H.R. 1370, the Department of Homeland Security Blue Campaign Authorization Act of 2017; and providing for consideration of H.R. 4667, making further supplemental appropriations for FY 2018, for disaster assistance for Hurricanes and Wildfires in calendar year 2017",
      vote_type: "YEA-AND-NAY",
      date: new Date("2017-12-21 14:02:00").toISOString(),
      results: {
        democratic: {
          yes: 0,
          no: 188,
          present: 0,
          not_voting: 5,
          majority_position: "No"
        },
        republican: {
          yes: 232,
          no: 0,
          present: 0,
          not_voting: 7,
          majority_position: "Yes"
        },
        independent: {
          yes: 0,
          no: 0,
          present: 0,
          not_voting: 0
        },
        total: {
          yes: 232,
          no: 188,
          present: 0,
          not_voting: 11
        },
        result: "Passed"
      }
    }
  ]);
});
