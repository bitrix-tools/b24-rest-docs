# Обзор событий при работе с карточкой звонка WebRTC-клиента

События `BackgroundCallCard::*` позволяют приложению реагировать на действия пользователя в карточке звонка и на изменения состояния интерфейса без дополнительного опроса.

{% note info "" %}

События работают только в контексте приложения в плейсменте `PAGE_BACKGROUND_WORKER`.

{% endnote %}

> Быстрый переход: [все события](#all-events)

## Как подписаться на события

1. Подпишитесь на нужное событие через [BX24.placement.bindEvent](../../bx24-placement-bind-event.md).
2. Обрабатывайте данные события в callback приложения.
3. После события [BackgroundCallCard::initialized](./initialized.md) запускайте логику управления карточкой.

## Как выбрать событие

#|
|| **Сценарий** | **Что использовать** | **Что приходит в callback** ||
|| Приложение получило доступ к созданной карточке звонка | [BackgroundCallCard::initialized](initialized.md) | Стартовые данные звонка и привязки к CRM ||
|| Оператор нажимает кнопки управления звонком | [BackgroundCallCard::muteButtonClick](mute-button-click.md), [BackgroundCallCard::holdButtonClick](hold-button-click.md), [BackgroundCallCard::hangupButtonClick](hang-up-button-click.md), [BackgroundCallCard::answerButtonClick](answer-button-click.md) | Данные конкретного действия в интерфейсе ||
|| Оператор работает с переводом звонка | [BackgroundCallCard::transferButtonClick](transfer-button-click.md), [BackgroundCallCard::cancelTransferButtonClick](cancel-transfer-button-click.md), [BackgroundCallCard::completeTransferButtonClick](complete-transfer-button-click.md) | Данные по сценарию перевода ||
|| В режиме обзвона меняется текущий клиент | [BackgroundCallCard::entityChanged](entity-changed.md) | Номер клиента и текущая CRM-привязка ||
|| Нужны дополнительные действия из интерфейса карточки, например сохранить комментарий, оценить качество связи или ввести цифру на клавиатуре | [BackgroundCallCard::addCommentButtonClick](add-comment-button-click.md), [BackgroundCallCard::dialpadButtonClick](dialpad-button-click.md), [BackgroundCallCard::qualityMeterClick](quality-meter-click.md), [BackgroundCallCard::notifyAdminButtonClick](notify-admin-button-click.md), [BackgroundCallCard::nextButtonClick](next-button-click.md), [BackgroundCallCard::skipButtonClick](skip-button-click.md), [BackgroundCallCard::makeCallButtonClick](make-call-button-click.md), [BackgroundCallCard::closeButtonClick](close-button-click.md) | Значение, выбранное пользователем, или параметры действия ||
|#

## Обзор событий {#all-events}

> Scope: [`telephony`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [BackgroundCallCard::initialized](initialized.md) | После создания карточки звонка ||
|| [BackgroundCallCard::addCommentButtonClick](add-comment-button-click.md) | При сохранении комментария в карточке звонка ||
|| [BackgroundCallCard::muteButtonClick](mute-button-click.md) | При нажатии на кнопку выключения микрофона ||
|| [BackgroundCallCard::holdButtonClick](hold-button-click.md) | При нажатии на кнопку удержания звонка ||
|| [BackgroundCallCard::closeButtonClick](close-button-click.md) | При нажатии на кнопку закрытия карточки звонка ||
|| [BackgroundCallCard::transferButtonClick](transfer-button-click.md) | При выборе оператора, на которого текущий оператор хочет перевести звонок ||
|| [BackgroundCallCard::cancelTransferButtonClick](cancel-transfer-button-click.md) | При нажатии на кнопку «вернуться к звонку» ||
|| [BackgroundCallCard::completeTransferButtonClick](complete-transfer-button-click.md) | При нажатии на кнопку «перенаправить» ||
|| [BackgroundCallCard::hangupButtonClick](hang-up-button-click.md) | При нажатии на кнопку «завершить» ||
|| [BackgroundCallCard::nextButtonClick](next-button-click.md) | При нажатии на кнопку «следующий» ||
|| [BackgroundCallCard::skipButtonClick](skip-button-click.md) | При нажатии на кнопку «пропустить» ||
|| [BackgroundCallCard::answerButtonClick](answer-button-click.md) | При нажатии на кнопку «ответить» ||
|| [BackgroundCallCard::entityChanged](entity-changed.md) | В карточке обзвона при смене текущего обзваниваемого ||
|| [BackgroundCallCard::makeCallButtonClick](make-call-button-click.md) | При нажатии на кнопку «позвонить» или «перезвонить» ||
|| [BackgroundCallCard::qualityMeterClick](quality-meter-click.md) | При оценке качества связи ||
|| [BackgroundCallCard::dialpadButtonClick](dialpad-button-click.md) | При нажатии на одну из цифровых кнопок телефона ||
|| [BackgroundCallCard::notifyAdminButtonClick](notify-admin-button-click.md) | При нажатии на кнопку «уведомить администратора» ||
|#
