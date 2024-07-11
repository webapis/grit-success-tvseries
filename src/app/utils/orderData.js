function orderByMarka(arr) {
    // Group objects by their "marka" property
    const groupedByMarka = {};
    arr.forEach(obj => {
        const marka = obj.marka;
        if (!groupedByMarka[marka]) {
            groupedByMarka[marka] = [];
        }
        groupedByMarka[marka].push(obj);
    });

    // Sort the groups by their "marka" property
    const sortedGroups = Object.values(groupedByMarka).sort((a, b) => {
        return a[0].marka.localeCompare(b[0].marka);
    });

    // Interleave the sorted groups to ensure no two adjacent objects have the same "marka" value
    const sortedArray = [];
    let maxGroupLength = 0;
    sortedGroups.forEach(group => {
        maxGroupLength = Math.max(maxGroupLength, group.length);
    });
    for (let i = 0; i < maxGroupLength; i++) {
        sortedGroups.forEach(group => {
            if (i < group.length) {
                sortedArray.push(group[i]);
            }
        });
    }

    return sortedArray;
}

 export default   orderByMarka
