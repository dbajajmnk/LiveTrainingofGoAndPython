export const orderService = {
  async getOrders() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const shouldFail = false;

    if (shouldFail) {
      throw new Error("Unable to fetch orders");
    }

    return [
      { id: 1, customer: "Deepak", total: 500, status: "Delivered" },
      { id: 2, customer: "Rahul", total: 1200, status: "Processing" },
      { id: 3, customer: "Aman", total: 850, status: "Shipped" }
    ];
  }
};
