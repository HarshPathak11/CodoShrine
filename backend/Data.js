const fakeData = {
    _id: 12345,
    username: "fakeuser",
    email: "fakeuser@example.com",
    platformProfiles: {
        "leetcode": {
            'username': 'neal_wu',
            'isId': true,
        },
        "codechef": {
            'username': 'rusty98',
            'isId': true,
        },
        "codeforces": {
            'username': '',
            'isId': false,
        }
    }
}

// RESPOSNSE DATA THAT WE WANT AFTER FETCHING PLATFORM USER DATA:
const fakeResponseData = {
    leetcode: {
        totalQuestionSolved: 100,
        totalContestsParticipated: 10,
        highestRating: 2000
    },
    codechef: {
        totalQuestionSolved: 100,
        totalContestsParticipated: 10,
        highestRating: 2000
    }
}

export default fakeData;