# Управление SIP-подключениями: обзор методов

Раздел описывает работу с SIP-подключениями в телефонии:

- как проверить статус SIP-коннектора
- как создать и настроить SIP-подключение
- как получить список подключений приложения и контролировать статус регистрации
- как обновить или удалить подключение

Для вызова методов нужно право `Управление номерами — изменение`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как подключить АТС через REST-приложение](https://helpdesk.bitrix24.ru/open/19572116/)

## Связь с другими объектами

**Исходящая SIP-линия.** После создания SIP-подключения его `CONFIG_ID` можно использовать в [voximplant.line.outgoing.sip.set](../lines/voximplant-line-outgoing-sip-set.md), чтобы назначить исходящую SIP-линию по умолчанию.

**SIP-регистрация.** Для облачной АТС в ответе [voximplant.sip.get](./voximplant-sip-get.md) возвращается `REG_ID`. Этот идентификатор используется в [voximplant.sip.status](./voximplant-sip-status.md) для проверки состояния регистрации.

## Как выбрать тип подключения

#|
|| **Тип** | **Описание** | **Когда использовать** ||
|| `cloud` | Облачная АТС оператора | Когда подключение идет к внешнему SIP-провайдеру ||
|| `office` | Офисная АТС | Когда подключение идет к локальной или офисной АТС ||
|#

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа в телефонии](https://helpdesk.bitrix24.ru/open/18177766/)

{% endnote %}

## Как начать работу

1. Проверьте статус SIP-коннектора через [voximplant.sip.connector.status](./voximplant-sip-connector-status.md)
2. Создайте подключение методом [voximplant.sip.add](./voximplant-sip-add.md), указав тип `cloud` или `office`
3. Получите список подключений через [voximplant.sip.get](./voximplant-sip-get.md) и выберите нужный `CONFIG_ID`
4. Для облачной АТС проверьте статус регистрации методом [voximplant.sip.status](./voximplant-sip-status.md) по `REG_ID`
5. При необходимости обновите подключение через [voximplant.sip.update](./voximplant-sip-update.md) или удалите через [voximplant.sip.delete](./voximplant-sip-delete.md)

## Обзор методов {#all-methods}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

#|
|| **Метод** | **Описание** ||
|| [voximplant.sip.add](./voximplant-sip-add.md) | Создает SIP-подключение с привязкой к приложению ||
|| [voximplant.sip.update](./voximplant-sip-update.md) | Обновляет существующее SIP-подключение ||
|| [voximplant.sip.get](./voximplant-sip-get.md) | Возвращает список SIP-подключений, созданных приложением ||
|| [voximplant.sip.status](./voximplant-sip-status.md) | Возвращает статус SIP-регистрации для облачной АТС ||
|| [voximplant.sip.delete](./voximplant-sip-delete.md) | Удаляет существующее SIP-подключение ||
|| [voximplant.sip.connector.status](./voximplant-sip-connector-status.md) | Возвращает текущий статус SIP-коннектора ||
|#
