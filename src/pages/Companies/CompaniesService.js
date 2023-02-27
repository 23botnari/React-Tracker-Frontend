export const CompaniesService = {
 
  getCompaniesData() {
    return [
      {
        name: "Zepto",
        isActive: true,
        createdAt: "02-01-2023",
        updatedAt: "13-12-2022",
      },
      {
        name: "Ford",
        isActive: false,
        createdAt: "02-01-2023",
        updatedAt: "02-01-2023",
      },
    ];
  },
  getCompanies() {
    return Promise.resolve(this.getCompaniesData());
  },
};
