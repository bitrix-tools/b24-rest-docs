# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- где используются кассы в битрикс24
- как происходит обмен чеками
- где используются чеки
- какая логика взаимодействия между обработчиками касс, кассами и чеками в REST API

{% endnote %}

{% endif %}

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор CRM (право «Разрешить изменять настройки»)

#|
|| **Метод** | **Описание** ||
|| [sale.cashbox.handler.add](./sale-cashbox-handler-add.md) | Добавляет REST-обработчик кассы ||
|| [sale.cashbox.handler.update](./sale-cashbox-handler-update.md) | Обновляет данные REST-обработчика кассы ||
|| [sale.cashbox.handler.list](./sale-cashbox-handler-list.md) | Возвращает список доступных REST-обработчиков касс ||
|| [sale.cashbox.handler.delete](./sale-cashbox-handler-delete.md) | Удаляет REST-обработчик кассы ||
|| [sale.cashbox.add](./sale-cashbox-add.md) | Добавляет кассу ||
|| [sale.cashbox.update](./sale-cashbox-update.md) | Обновляет существующую кассу ||
|| [sale.cashbox.list](./sale-cashbox-list.md) | Возвращает список настроенных касс ||
|| [sale.cashbox.delete](./sale-cashbox-delete.md) | Удаляет кассу ||
|| [sale.cashbox.check.apply](./sale-cashbox-check-apply.md) | Сохраняет результат печати чека, напечатанного на REST-кассе ||
|#