# Пользовательские типы полей в CRM

В CRM можно создавать поля двух типов:
- стандартные: число, строка, дата, адрес, ссылка, файл и так далее,
- пользовательские: встройки приложений внутри карточки CRM.
  
С помощью полей пользовательского типа можно:

- выводить в карточке CRM данные, которым не подходят стандартные типы полей. Фактически данные будут храниться в базе приложения в нужном формате, а встройка будет показывать их внутри поля.
- создавать элементы интерфейса в карточках CRM. Например, выводить внутри поля кнопки для управления приложением.
- интегрировать внешние сервисы в карточку CRM. Например, выводить в поле динамическую информацию. При каждом открытии карточки поле будет совершать запрос к обработчику приложения и автоматически подгружать свежие данные.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Работа с пользовательскими полями](https://helpdesk.bitrix24.ru/open/22048980/)

## Связь с объектами CRM

Пользовательские типы полей можно добавлять в карточки:
- [сделок](../../deals/index.md) — используйте методы [crm.deal.userfield.add](../../deals/user-defined-fields/crm-deal-userfield-add.md) или [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [лидов](../../leads/index.md) — [crm.lead.userfield.add](../../leads/userfield/crm-lead-userfield-add.md) или [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [контактов](../../contacts/index.md) — [crm.contact.userfield.add](../../contacts/userfield/crm-contact-userfield-add.md) или [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [компаний](../../companies/index.md) — [crm.company.userfield.add](../../companies/userfields/crm-company-userfield-add.md) или [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [новых счетов](../invoice.md) — [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [коммерческих предложений](../../quote/index.md) — [crm.quote.userfield.add](../../quote/user-field/crm-quote-user-field-add.md) или [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md),
- [смарт-процессов](../index.md) — [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md).

В поле `USER_TYPE_ID` передавайте значение по форме `rest_#ID_приложения#_#USER_TYPE_ID#`. Например, для приложения с `ID: 123` и `USER_TYPE_ID: userfield1` значение будет `rest_123_test_userfield1`.

Чтобы получить `ID` приложения, используйте метод [app.info](../../../common/system/app-info.md).

## Ошибки при работе с пользовательскими типами полей

### Ошибка 400 при создании поля

При создании поля с пользовательским типом можно получить ошибку `Error! 400: ERROR_CORE: Указан неверный пользовательский тип. (400)`.

1. Выполните метод [userfieldtype.list](../../../widgets/user-field/userfieldtype-list.md).

   - Если метод вернул тип поля `USER_TYPE_ID`,  переходите к пункту 2.

   - Если нужный тип поля не найден, зарегистрируйте новый тип методом [userfieldtype.add](../../../widgets/user-field/userfieldtype-add.md).

2. Выполните метод [app.info](../../../common/system/app-info.md). Метод проверит корректность установки приложения.

   - Если метод вернул `INSTALLED = true`, приложение установлено корректно.

   - Если метод вернул `INSTALLED = false`, выполните на странице приложения метод [BX24.installFinish](../../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md). Метод завершит установку приложения с интерфейсом.

    ```javascript
    BX24.init(function(){
        BX24.installFinish();
    });
    ```

### Ошибка 50x при загрузке поля

Если поле создалось без ошибок, но контент в нем не загружается:

1. Проверьте URL обработчика `HANDLER`, указанный при регистрации поля, методом [userfieldtype.list](../../../widgets/user-field/userfieldtype-list.md). Чтобы изменить `HANDLER`, используйте метод [userfieldtype.update](../../../widgets/user-field/userfieldtype-update.md).

2. Убедитесь, что обработчик доступен из интернета:

   - не используйте локальные адреса: localhost, 192.168.* и другие адреса, доступные только из локальной сети,

   - проверьте доступность обработчика с помощью публичных сервисов «доступности сайта».

3. Проверьте:

   - корректность SSL-сертификата, если используется HTTPS,

   - отсутствие блокировок в .htaccess или firewall на сервере обработчика,

   - возвращаемые HTTP-коды, должен быть 200 OK.

## Общие рекомендации

- Используйте HTTPS-протокол для обработчиков, иначе браузеры могут блокировать загрузку контента приложения.

- Давайте понятные названия для типов полей: учитывайте назначение поля и связь с приложением. Тип поля нельзя переименовать после создания — только удалить и зарегистрировать заново.

{% note tip "Частые кейсы и сценарии" %}

-  [Встроить виджет в лид в виде пользовательского свойства](../../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page)

-  [Механизм встройки виджетов](../../../widgets/index)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`placement, crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [userfieldtype.add](../../../widgets/user-field/userfieldtype-add.md) | Регистрирует новый тип пользовательского поля ||
|| [userfieldtype.update](../../../widgets/user-field/userfieldtype-update.md) | Изменяет параметры существующего типа поля ||
|| [userfieldtype.list](../../../widgets/user-field/userfieldtype-list.md) | Возвращает список зарегистрированных типов полей ||
|| [userfieldtype.delete](../../../widgets/user-field/userfieldtype-delete.md) | Удаляет зарегистрированный тип поля ||
|#
