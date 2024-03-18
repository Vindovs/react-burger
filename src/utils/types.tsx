export type TIngredient = {
  type: string;
  _id: string;
  name: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
  image: string;
};

export type TUserInfo = {
  email?: string;
  name?: string;
  password?: string;
}

export type TIngredientsState = {
  data: TIngredient[];
  dataRequested: boolean;
  errorMessage?: string;
}

export type TRootState = {
  data: TIngredientsState;
}

export type TConstructor = TIngredient & { idUniq: string }

export type TResponse<TDataKey extends string = ' ', TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;

}

export type TIngredientsResponse = TResponse<'data', Array<TIngredient>>;

export type TUserLogInResponse = TResponse<'user', Omit<TUserInfo, 'password'>> & {
  accessToken: string,
  refreshToken: string,
}

export type TOwner = Omit<TUserInfo, 'password'> & {
  createdAt: Date | unknown;
  updatedAt: Date | unknown;
}

export type TOrder = {
  ingredients: Array<TIngredient>;
  createdAt: Date | unknown;
  name: string | unknown;
  owner: TOwner;
  price: number | unknown;
  status: string | unknown;
  number: number;
}

export type TOrderResponse = TResponse<'order', TOrder> & { name: string; }