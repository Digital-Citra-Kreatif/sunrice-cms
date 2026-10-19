<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #111;">
    <p>Someone sent the <strong>{{ $form->title }}</strong> form:</p>
    <table cellpadding="6" style="border-collapse: collapse;">
        @foreach ($rows as $row)
            <tr>
                <th align="left" valign="top" style="border-bottom: 1px solid #ddd;">{{ $row['label'] }}</th>
                <td style="border-bottom: 1px solid #ddd; white-space: pre-wrap;">{{ $row['value'] }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
