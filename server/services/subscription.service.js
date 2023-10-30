const processSizeFilesData = (allSizesGroupByUser) => {
    let data = {};
    allSizesGroupByUser.map((sizeByUser) => {
        data[sizeByUser._id] = {};
        data[sizeByUser._id].currentUsage = sizeByUser.totalSize;
        data[sizeByUser._id].currentUsageInKB = sizeByUser.totalSize / 1024;
        data[sizeByUser._id].currentUsageInMB =
            sizeByUser.totalSize / (1024 * 1024);
        data[sizeByUser._id].currentUsageInGB =
            sizeByUser.totalSize / (1024 * 1024 * 1024);
    });
    return data;
}

module.exports.processSizeFilesData = processSizeFilesData;