# Методы работы с пользователями Битрикс24

> Scope: [`user`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Методы работы с пользователями Битрикс24 позволяют приглашать новых пользователей, изменять данные существующих пользователей и выбирать пользователей при помощи условий. Приложения, которые используют эти методы в своих сценариях, должны обеспечивать максимальную безопасность пользовательских данных и получать только ту информацию о пользователях, которая действительно необходима для работы приложения.

Чтобы гарантировать пользователям безопасность их персональной информации, существует несколько уровней доступа через методы работы с пользователями:

- **Ограниченные версии доступа**:
    - `user_brief`, который позволяет получать базовую информацию о пользователях, без их контактных данных и пользовательских полей. Этот скоуп необходим и достаточен для сценариев, в которых требуется отобразить ФИО пользователя в интерфейсе приложения.
    - `user_basic`, который позволяет получать не только базовую информацию, но и контактные данные пользователей Битрикс24. Этот скоуп нужен для сценариев, связанных с совершением звонков, или отправкой e-mail сообщений при помощи вашего приложения.

- **Полные версии доступа**:
    - `user`, который позволяет получить все стандартные поля, а кроме того, делает доступной возможность приглашения новых пользователей и изменение данных существующих пользователей.
    - `user.userfield`, который открывает доступ к методам для работы с пользовательскими полями пользователей (расширяет перечень доступных полей в методах чтения, доступных в скоупах выше) для получения, добавления, изменения и удаления пользовательских полей.

{% note info "Внимание!" %}

Это максимальный уровень доступа к персональной информации, запрашивать его нужно очень ответственно.

{% endnote %}

{% note info "Внимание!" %}

Длина имени пользователя не должна превышать 25 символов.

{% endnote %}

## Ограниченные версии скоупа user

В этих скоупах нельзя добавлять/обновлять пользователей: не доступны методы [user.add](./user-add.md) и [user.update](./user-update.md). Во всех остальных методах получения информации о пользователе доступны только эти поля (с версии **Rest 21.600.0**):

| user_basic | user_brief |
|------------|------------|
| ID | ID |
| XML_ID | XML_ID |
| ACTIVE | ACTIVE |
| NAME | NAME |
| LAST_NAME | LAST_NAME |
| SECOND_NAME | SECOND_NAME |
| TITLE | TITLE |
| EMAIL | IS_ONLINE |
| PERSONAL_PHONE | TIME_ZONE |
| WORK_PHONE | TIME_ZONE_OFFSET |
| WORK_POSITION | TIMESTAMP_X |
| WORK_COMPANY | DATE_REGISTER |
| IS_ONLINE | PERSONAL_PROFESSION |
| TIME_ZONE | PERSONAL_GENDER |
| TIMESTAMP_X | PERSONAL_BIRTHDAY |
| TIME_ZONE_OFFSET | PERSONAL_PHOTO |
| DATE_REGISTER | PERSONAL_CITY |
| LAST_ACTIVITY_DATE | PERSONAL_STATE |
| PERSONAL_PROFESSION | PERSONAL_COUNTRY |
| PERSONAL_GENDER | WORK_POSITION |
| PERSONAL_BIRTHDAY | WORK_CITY |
| PERSONAL_PHOTO | WORK_STATE |
| PERSONAL_PHONE | WORK_COUNTRY |
| PERSONAL_FAX | LAST_ACTIVITY_DATE |
| PERSONAL_MOBILE | UF_EMPLOYMENT_DATE |
| PERSONAL_PAGER | UF_TIMEMAN |
| PERSONAL_STREET | UF_SKILLS |
| PERSONAL_MAILBOX | UF_INTERESTS |
| PERSONAL_CITY | UF_DEPARTMENT |
| PERSONAL_STATE | UF_PHONE_INNER |
| PERSONAL_ZIP | |
| PERSONAL_COUNTRY | |
| PERSONAL_NOTES | |
| WORK_COMPANY | |
| WORK_DEPARTMENT | |
| WORK_POSITION | |
| WORK_WWW | |
| WORK_PHONE | |
| WORK_FAX | |
| WORK_PAGER | |
| WORK_STREET | |
| WORK_MAILBOX | |
| WORK_CITY | |
| WORK_STATE | |
| WORK_ZIP | |
| WORK_COUNTRY | |
| WORK_PROFILE | |
| WORK_LOGO | |
| WORK_NOTES | |
| UF_DEPARTMENT | |
| UF_DISTRICT | |
| UF_SKYPE | |
| UF_SKYPE_LINK | |
| UF_ZOOM | |
| UF_TWITTER | |
| UF_FACEBOOK* | |
| UF_LINKEDIN | |
| UF_XING | |
| UF_WEB_SITES | |
| UF_PHONE_INNER | |
| UF_EMPLOYMENT_DATE | |
| UF_TIMEMAN | |
| UF_SKILLS | |
| UF_INTERESTS | |

{% note info "" %}

*Социальная сеть признана экстремистской и запрещена на территории Российской Федерации.

{% endnote %}

## Полная версия скоупа user

В полной версии доступны поля (с версии **Rest 21.600.0**):

#|
|| **user** ||
|| ID ||
|| XML_ID ||
|| ACTIVE ||
|| NAME ||
|| LAST_NAME ||
|| SECOND_NAME ||
|| TITLE ||
|| EMAIL ||
|| LAST_LOGIN ||
|| DATE_REGISTER ||
|| TIME_ZONE ||
|| IS_ONLINE ||
|| TIME_ZONE_OFFSET ||
|| TIMESTAMP_X ||
|| LAST_ACTIVITY_DATE ||
|| PERSONAL_PROFESSION ||
|| PERSONAL_GENDER ||
|| PERSONAL_WWW ||
|| PERSONAL_BIRTHDAY ||
|| PERSONAL_PHOTO ||
|| PERSONAL_ICQ ||
|| PERSONAL_PHONE ||
|| PERSONAL_FAX ||
|| PERSONAL_MOBILE ||
|| PERSONAL_PAGER ||
|| PERSONAL_STREET ||
|| PERSONAL_MAILBOX ||
|| PERSONAL_CITY ||
|| PERSONAL_STATE ||
|| PERSONAL_ZIP ||
|| PERSONAL_COUNTRY ||
|| PERSONAL_NOTES ||
|| WORK_COMPANY ||
|| WORK_DEPARTMENT ||
|| WORK_POSITION ||
|| WORK_WWW ||
|| WORK_PHONE ||
|| WORK_FAX ||
|| WORK_PAGER ||
|| WORK_STREET ||
|| WORK_MAILBOX ||
|| WORK_CITY ||
|| WORK_STATE ||
|| WORK_ZIP ||
|| WORK_COUNTRY ||
|| WORK_PROFILE ||
|| WORK_LOGO ||
|| WORK_NOTES ||
|| UF_DEPARTMENT ||
|| UF_DISTRICT ||
|| UF_SKYPE ||
|| UF_SKYPE_LINK ||
|| UF_ZOOM ||
|| UF_TWITTER ||
|| UF_FACEBOOK* ||
|| UF_LINKEDIN ||
|| UF_XING ||
|| UF_WEB_SITES ||
|| UF_PHONE_INNER ||
|| UF_EMPLOYMENT_DATE ||
|| UF_TIMEMAN ||
|| UF_SKILLS ||
|| UF_INTERESTS ||
|#

{% note info "" %}

*Социальная сеть признана экстремистской и запрещена на территории Российской Федерации.

{% endnote %}

## Методы

#|
|| **Метод** | **Описание** ||
|| [user.fields](user-fields.md) | Получение списка названий полей пользователя ||
|| [user.current](user-current.md) | Получение информации о текущем пользователе ||
|| [user.add](user-add.md) | Приглашение пользователя ||
|| [user.update](user-update.md) | Обновление данных пользователя ||
|| [user.get](user-get.md) | Получение фильтрованного списка пользователей ||
|| [user.search](user-search.md) | Получение списка пользователей с ускоренным поиском по персональным данным ||
|#