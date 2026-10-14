<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Sunrice\Support\Locales;

return new class extends Migration
{
    /**
     * Terms and globals translate like entries:
     *
     * - Term translations get Ready. Existing ones are live today, so
     *   they start Ready.
     * - Global sets lose their set-wide "translatable" switch: each
     *   field's own Translatable setting decides. The shared row of a
     *   set that wasn't translatable becomes its main-language row.
     *
     * Stored translations keep working as they are (full copies are read
     * like overlays); `sunrice:upgrade-translations` trims them.
     */
    public function up(): void
    {
        Schema::table('sunrice_term_translations', function (Blueprint $table): void {
            $table->boolean('is_ready')->default(false);
        });
        DB::table('sunrice_term_translations')->update(['is_ready' => true]);

        $main = Locales::main();
        $shared = DB::table('sunrice_globals')->where('translatable', false)->pluck('id');
        foreach ($shared as $id) {
            // A main-language row left from when the set was translatable loses to the shared one.
            if (DB::table('sunrice_global_values')->where('global_id', $id)->whereNull('locale')->exists()) {
                DB::table('sunrice_global_values')->where('global_id', $id)->whereNotNull('locale')->delete();
                DB::table('sunrice_global_values')->where('global_id', $id)->whereNull('locale')->update(['locale' => $main]);
            }
        }
        // Translatable sets: rows of a set switched off and on again.
        DB::table('sunrice_global_values')->whereNull('locale')->delete();

        Schema::table('sunrice_globals', function (Blueprint $table): void {
            $table->dropColumn('translatable');
        });
    }

    public function down(): void
    {
        Schema::table('sunrice_globals', function (Blueprint $table): void {
            $table->boolean('translatable')->default(true);
        });
        Schema::table('sunrice_term_translations', function (Blueprint $table): void {
            $table->dropColumn('is_ready');
        });
    }
};
