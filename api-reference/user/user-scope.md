# Версии User Scope

Чтобы обеспечить безопасность данных сотрудников, для приложений и вебхуков с [версии модуля](../../settings/cloud-and-on-premise/on-premise/versions.md) **Rest 21.600.0** доступны разные версии скоупа `User`.

- `user_brief` дает доступ к информации о пользователях без контактных данных. Этого достаточно для сценариев, в которых требуется отобразить ФИО пользователя в интерфейсе стороннего приложения.
- `user_basic` открывает базовую информацию и контактные данные пользователей. Это требуется сценариям, связанным с совершением звонков или отправкой e-mail сообщений.
- `user` дает полный доступ к информации пользователей, возможность приглашать новых пользователей и изменять данные существующих.

Для получения доступа к пользовательским полям добавьте приложению скоуп `user.userfield`.

## Ограниченные версии скоупа user

В этих скоупах нельзя добавлять и обновлять пользователей: не доступны методы [user.add](./user-add.md) и [user.update](./user-update.md). Во всех остальных методах получения информации о пользователе доступны только перечисленные поля.

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
| WORK_PHONE | PERSONAL_PHOTO |
| WORK_POSITION | TIMESTAMP_X |
| WORK_COMPANY | DATE_REGISTER |
| IS_ONLINE | PERSONAL_PROFESSION |
| TIME_ZONE | PERSONAL_GENDER |
| TIMESTAMP_X | PERSONAL_BIRTHDAY |
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

## Полная версия скоупа user

{% note info " " %}

Это максимальный уровень доступа к персональной информации, запрашивать его нужно очень ответственно.

{% endnote %}

В полной версии доступны все системные поля, создание и изменение профилей пользователей.

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

*Компания Meta, владеющая Facebook, признана экстремистской и запрещена на территории Российской Федерации.

{% endnote %}
