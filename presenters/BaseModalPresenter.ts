import { makeAutoObservable } from 'mobx';

export interface IModalConfig {
    cross: boolean;
    closeOnclickOutside: boolean;
    alignTop: boolean;
}

export const DEFAULT_MODAL_CONFIG: IModalConfig = {
    cross: true,
    closeOnclickOutside: true,
    alignTop: false,
};

export class BaseModalPresenter<
    ContentType extends string | number,
    ContentPayload extends Record<
        ContentType,
        Record<string | number, any> | undefined
    >,
> {
    private readonly _contentConfig: Partial<
        Record<ContentType, IModalConfig>
    > = {};

    private _isShown = false;
    private _payload: null | ContentPayload[keyof ContentPayload] = null;
    private _content: null | ContentType = null;

    public constructor(
        contentConfig: Partial<Record<ContentType, IModalConfig>> = {},
    ) {
        makeAutoObservable(this);

        this._contentConfig = contentConfig;
    }

    public get isShown(): boolean {
        return this._isShown;
    }

    public get payload(): null | ContentPayload[keyof ContentPayload] {
        return this._payload;
    }

    public get content(): null | ContentType {
        return this._content;
    }

    public get config(): IModalConfig {
        if (this._content && this._contentConfig[this._content]) {
            return this._contentConfig[this._content] ?? DEFAULT_MODAL_CONFIG;
        }

        return DEFAULT_MODAL_CONFIG;
    }

    public openModal = <C extends ContentType>(
        content: C,
        payload: ContentPayload[C],
    ): void => {
        this._isShown = true;
        this._content = content;
        this._payload = payload;
    };

    public closeModal = (): void => {
        this._isShown = false;
        this._content = null;
        this._payload = null;
    };
}
