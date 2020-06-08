import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { fetchUsuarios } from "./usuarios";

configure({ adapter: new Adapter() });

describe("Duck usuarios", () => {
  describe("fetchusuarios", () => {
    it("manejar el caso de exito", async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const services = {
        axios: {
          get: jest.fn().mockResolvedValue({
            data: 1,
          }),
        },
      };

      await fetchUsuarios()(dispatch, getState, services);
      expect(dispatch.mock.calls).toEqual([
        [
          {
            type: "FETCH_USUARIOS_START",
            error: false,
          },
        ],
        [
          {
            type: "FETCH_USUARIOS_SUCCESS",
            payload: 1,
          },
        ],
      ]);
    });

    it("manejar el caso de error", async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const services = {
        axios: {
          get: jest.fn().mockRejectedValue(1),
        },
      };

      await fetchUsuarios()(dispatch, getState, services);
      expect(dispatch.mock.calls).toEqual([
        [
          {
            type: "FETCH_USUARIOS_START",
            error: false,
          },
        ],
        [
          {
            type: "FETCH_USUARIOS_ERROR",
            payload: 1,
            error: true,
          },
        ],
      ]);
    });
  });
});
