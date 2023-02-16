export const CompaniesService = {
 
  getCompaniesData() {
    return [
      {
        name: "Zepto",
        isActive: true,
        createdAt: new Date(),
        updatedAt: "13-12-2022",
      },
      {
        name: "Ford",
        isActive: false,
        createdAt: new Date(),
        updatedAt: "02-01-2023",
      },
    ];
  },
  getCompanies() {
    return Promise.resolve(this.getCompaniesData());
  },
};
