# Подпись: обзор методов

Сервис для подписания Битрикс24 КЭДО позволяет подписывать кадровые документы с сотрудниками с помощью электронной подписи ПЭП. Она равна собственноручной и соответствует требованиям закона.

> Быстрый переход: [все методы и события](#all-methods) 
>
> Пользовательская документация: [Битрикс24 КЭДО](https://helpdesk.bitrix24.ru/open/19740668/), [Как настроить права доступа в Битрикс24 КЭДО](https://helpdesk.bitrix24.ru/open/20881134/)

Методы работают с документами раздела КЭДО — Подписание с сотрудниками.

Методы выполняются только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Обзор методов и событий {#all-methods} 

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [sign.b2e.document.send](./sign-b2e-document-send.md) | Отправляет документ на подписание ||
    || [sign.b2e.document.get](./sign-b2e-document-get.md) | Получает информацию о документе и участниках подписания ||
    || [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md) | Возвращает список провайдеров подписи компании ||
    || [sign.b2e.personal.tail](./sign-b2e-personal-tail.md) | Возвращает список подписанных документов пользователя ||
    || [sign.b2e.mysafe.tail](./sign-b2e-mysafe-tail.md) | Возвращает список подписанных документов в сейфе компании ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnSignB2eDocumentStatusChanged](./events/on-sign-b2e-document-status-changed.md) | При изменении статуса документа ||
    || [OnSignB2eMemberStatusChanged](./events/on-sign-b2e-member-status-changed.md) | При изменении статуса участника подписания ||
    |#

{% endlist %}

