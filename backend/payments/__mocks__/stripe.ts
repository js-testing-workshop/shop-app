export const mockSessionsList = jest.fn().mockResolvedValue({
  data: [
    {
      status: "complete",
      created: "now",
      metadata: {
        "1": JSON.stringify({ id: 1, title: "title1" }),
        "2": JSON.stringify({ id: 2, title: "title2" }),
      },
    },
  ],
});

export const mockSessionCreate = jest
  .fn()
  .mockResolvedValue({ client_secret: "some_client_secret" });

const mock = jest.fn().mockImplementation(() => {
  return {
    checkout: {
      sessions: { list: mockSessionsList, create: mockSessionCreate },
    },
  };
});

export default mock;
