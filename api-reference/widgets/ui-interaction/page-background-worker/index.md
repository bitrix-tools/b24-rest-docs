# Управление карточкой звонка WebRTC-клиента: обзор методов

Плейсмент `PAGE_BACKGROUND_WORKER` используется приложениями телефонии, которым нужно работать с карточкой звонка из фонового невидимого фрейма на страницах Битрикс24. Через js-интерфейс плейсмента приложение может менять состояние карточки, управлять действиями оператора и обрабатывать события интерфейса.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Карточка звонка](https://helpdesk.bitrix24.ru/open/18425138/)

## Как начать работу с PAGE_BACKGROUND_WORKER

1. Зарегистрируйте плейсмент `PAGE_BACKGROUND_WORKER` через [placement.bind](../../placement-bind.md).
2. Проверьте сценарий регистрации и требования к `errorHandlerUrl` на странице [Сценарий встройки WebRTC](./webrtc-scenario.md).
3. Регистрируйте звонок через [telephony.externalcall.register](../../../telephony/index.md), чтобы открыть карточку звонка.
4. После события [BackgroundCallCard::initialized](./events/initialized.md) вызывайте команды плейсмента через [BX24.placement.call](../bx24-placement-call.md).
5. Подписывайтесь на пользовательские действия карточки через [BX24.placement.bindEvent](../bx24-placement-bind-event.md).

## Как устроен вызов API плейсмента

В `PAGE_BACKGROUND_WORKER` команды и события плейсмента не являются самостоятельными REST-методами. Приложение работает с ними через общий js-интерфейс встраивания.

Чтобы выполнить команду плейсмента, передайте ее имя в [BX24.placement.call](../bx24-placement-call.md). Для `PAGE_BACKGROUND_WORKER` доступны команды `CallCardSetMute`, `CallCardSetHold`, `CallCardSetUiState`, `CallCardGetListUiStates`, `CallCardSetCardTitle`, `CallCardSetStatusText` и `CallCardClose`. Команды управления карточкой обычно возвращают пустой массив при успешном вызове, а `CallCardGetListUiStates` возвращает массив доступных состояний интерфейса.

Чтобы реагировать на действия пользователя в карточке без повторного запроса, подпишитесь на события через [BX24.placement.bindEvent](../bx24-placement-bind-event.md). В `PAGE_BACKGROUND_WORKER` доступен набор событий `BackgroundCallCard::*` из раздела [События](./events/index.md). В обработчик приходят данные о текущем звонке и карточке, а также данные конкретного действия пользователя в интерфейсе.

## Обзор методов и событий {#all-methods}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [CallCardSetMute](./call-card-set-mute.md) | Выключает или включает микрофон оператора ||
    || [CallCardSetHold](./call-card-set-hold.md) | Ставит звонок на удержание или снимает с удержания ||
    || [CallCardSetUiState](./call-card-set-ui-state.md) | Меняет состояние интерфейса карточки звонка ||
    || [CallCardGetListUiStates](./call-card-get-list-ui-states.md) | Возвращает доступные состояния интерфейса карточки ||
    || [CallCardSetCardTitle](./call-card-set-card-title.md) | Меняет заголовок карточки звонка ||
    || [CallCardSetStatusText](./call-card-set-status-text.md) | Меняет текст в центральной части карточки ||
    || [CallCardClose](./call-card-close.md) | Закрывает карточку звонка ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [BackgroundCallCard::initialized](./events/initialized.md) | После создания карточки звонка ||
    || [BackgroundCallCard::addCommentButtonClick](./events/add-comment-button-click.md) | При сохранении комментария в карточке звонка ||
    || [BackgroundCallCard::muteButtonClick](./events/mute-button-click.md) | При нажатии на кнопку выключения микрофона ||
    || [BackgroundCallCard::holdButtonClick](./events/hold-button-click.md) | При нажатии на кнопку удержания звонка ||
    || [BackgroundCallCard::closeButtonClick](./events/close-button-click.md) | При нажатии на кнопку закрытия карточки звонка ||
    || [BackgroundCallCard::transferButtonClick](./events/transfer-button-click.md) | При выборе оператора для перевода звонка ||
    || [BackgroundCallCard::cancelTransferButtonClick](./events/cancel-transfer-button-click.md) | При нажатии на кнопку «вернуться к звонку» ||
    || [BackgroundCallCard::completeTransferButtonClick](./events/complete-transfer-button-click.md) | При нажатии на кнопку «перенаправить» ||
    || [BackgroundCallCard::hangupButtonClick](./events/hang-up-button-click.md) | При нажатии на кнопку «завершить» ||
    || [BackgroundCallCard::nextButtonClick](./events/next-button-click.md) | При нажатии на кнопку «следующий» ||
    || [BackgroundCallCard::skipButtonClick](./events/skip-button-click.md) | При нажатии на кнопку «пропустить» ||
    || [BackgroundCallCard::answerButtonClick](./events/answer-button-click.md) | При нажатии на кнопку «ответить» ||
    || [BackgroundCallCard::entityChanged](./events/entity-changed.md) | При смене текущего обзваниваемого в карточке обзвона ||
    || [BackgroundCallCard::makeCallButtonClick](./events/make-call-button-click.md) | При нажатии на кнопку «позвонить» или «перезвонить» ||
    || [BackgroundCallCard::qualityMeterClick](./events/quality-meter-click.md) | При оценке качества связи ||
    || [BackgroundCallCard::dialpadButtonClick](./events/dialpad-button-click.md) | При нажатии на одну из цифровых кнопок телефона ||
    || [BackgroundCallCard::notifyAdminButtonClick](./events/notify-admin-button-click.md) | При нажатии на кнопку «уведомить администратора» ||
    |#

{% endlist %}
