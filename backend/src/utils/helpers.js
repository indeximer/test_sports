function removeDuplicates(arr){
    const unique = arr.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
    }, []);
    return unique
}

async function resolvePromises(promissesArray){
    let data = await Promise.all(promissesArray)
        .then(res => res)
    data = data.map(item => item.data)
    data = [].concat.apply([], data)
    return removeDuplicates(data)
}

module.exports = {
    resolvePromises,
    removeDuplicates
}