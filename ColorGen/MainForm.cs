using System;
using System.Drawing;
using System.Windows.Forms;

namespace ColorGen {
    public partial class MainForm : Form {
        public MainForm() {
            InitializeComponent();
        }

        Int32 GetRandomNumber(Int32 lowerBound, Int32 upperBound) {
            Int32 seed = Guid.NewGuid().GetHashCode() % 50001;
            var rnd = new Random(seed);
            return rnd.Next(lowerBound, upperBound);
        }

        protected override void OnPaint(PaintEventArgs e) {
            try {
                Color redColorSeed = ColorTranslator.FromHtml("#e40b7c");
                Color greenColorSeed = ColorTranslator.FromHtml("#8ac900");

                const Single PatternSize = 20f;
                Int32 columnCount = Convert.ToInt32(Math.Ceiling(ClientSize.Width / PatternSize));
                Int32 rowCount = Convert.ToInt32(Math.Ceiling(ClientSize.Height / PatternSize));

                for (Int32 colIdx = 0; colIdx < columnCount; colIdx++) {
                    for (Int32 rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                        Int32 red = (GetRandomNumber(0, 256) + redColorSeed.R) / 2;
                        Int32 green = (GetRandomNumber(0, 256) + redColorSeed.G) / 2;
                        Int32 blue = (GetRandomNumber(0, 256) + redColorSeed.B) / 2;
                        Color randColor = Color.FromArgb(255, red, green, blue);

                        //e.Graphics.DrawRectangle(new Pen(randColor), colIdx * PatternSize, rowIdx * PatternSize, PatternSize, PatternSize);
                        e.Graphics.FillRectangle(new SolidBrush(randColor), colIdx * PatternSize, rowIdx * PatternSize,
                            PatternSize, PatternSize);
                    }
                }
            }
            catch (Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }
    }
}