<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    <p>Someone sent the <strong>{{ $form->title }}</strong> form in {{ $language }}@if ($page), from <a href="{{ $page }}">{{ $page }}</a>@endif:</p>
    <table cellpadding="6" style="border-collapse: collapse;">
        @foreach ($rows as $row)
            <tr>
                <th align="left" valign="top" style="border-bottom: 1px solid #ddd;">{{ $row['label'] }}</th>
                <td style="border-bottom: 1px solid #ddd; white-space: pre-wrap;">@if ($row['file'])<a href="{{ $row['file'] }}">{{ $row['value'] }}</a>@else{{ $row['value'] }}@endif</td>
            </tr>
        @endforeach
    </table>
    <p><a href="{{ $admin }}">See the {{ $form->title }} submissions</a> (files download there, once you're signed in).</p>
</body>
</html>
