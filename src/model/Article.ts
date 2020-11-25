export interface Article {
    title: string;
    time: number;
    abstract: string;
    tags: string[];
    category: CATEGORY;
}

export enum CATEGORY {
    All = 'All',
    Code = 'Code',
    Diary = 'Diary',
    Essay = 'Essay',
    Other = 'Other',
}

export const str2cate = (str: string | undefined) : CATEGORY | undefined => {
    if (!str) return undefined;
    if (str === CATEGORY.Code) return CATEGORY.Code;
    if (str === CATEGORY.Diary) return CATEGORY.Diary;
    if (str === CATEGORY.Essay) return CATEGORY.Essay;
    if (str === CATEGORY.Other) return CATEGORY.Other;
    return CATEGORY.All;
}
