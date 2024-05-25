/*export const manipulateData = (sortValue, filterValue) => {
    let len = 0, ref = [];

    if (filterValue !== 'all') {
        for (let i = 0; i < movies.length; i++) {
            if (mapGenres(movies[i]).includes(filterValue)) {
                ref.push(movies[i]);
            }
        }

        len = ref.length;
    } else {
        ref = movies;
        len = movieCount;
    }

    if (sortValue === 'title-asc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].title.toLowerCase() <
                    ref[minIndex].title.toLowerCase()
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    } else if (sortValue === 'title-desc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].title.toLowerCase() >
                    ref[minIndex].title.toLowerCase()
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    } else if (sortValue === 'date-asc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].release_date.toLowerCase() >
                    ref[minIndex].release_date.toLowerCase()
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    } else if (sortValue === 'date-desc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].release_date.toLowerCase() <
                    ref[minIndex].release_date.toLowerCase()
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    } else if (sortValue === 'rating-asc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].vote_average < ref[minIndex].vote_average
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    } else if (sortValue === 'rating-desc') {
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (
                    ref[j].vote_average > ref[minIndex].vote_average
                ) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                const temp = ref[i];
                ref[i] = ref[minIndex];
                ref[minIndex] = temp;
            }
        }
    }

    return ref;
}*/