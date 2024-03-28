
using System.Drawing;
using System;
using System.Diagnostics.Metrics;

namespace MyApplication
{
    class Program
    {
        enum Shape
        {
            Rectangle = 1,
            Triangle,
            Exit

        }
        static void PrintSpaces(int numSpaces)
        {
            for (int i = 0; i < numSpaces; i++)
            {
                Console.Write(" "); // הדפסת רווח
            }
        }
         
        
        
        static void PrintTriangle(int width, int height)
         {
            string str = "";
            int space = (width - (str.Length)) / 2 ;//כל שורה יורד שתיים 
                int num = 0, numofnunmbers = 0, lines = 0, counter = 0, widthToCount = 0;
                double area = 0, perimeter = 0;





                //first line 
                PrintSpaces(space);
                Console.WriteLine("*");

                // מספר המספרים האי זוגיות שקיימים בין   
                widthToCount = (int)width - 2;
                while (widthToCount != 1)
                {
                    counter++;
                    widthToCount -= 2;
                }
                numofnunmbers = counter;
                lines = (int)height - 2;
                int numbers = (lines - (lines % numofnunmbers)) / numofnunmbers;//מספר שורות שנשאר שצריך להדפיס מכל ספרה אי זוגית 
                str = "***";
                space -= 1;

                if (lines % numofnunmbers != 0)//מספר השורות לחלק לכמות המספרים מתחלק ללא שאירת אז בכל מספר איזוגי יש מספר שווה של שורות 
                {
                for (int i = 1; i <= lines % numofnunmbers; i++)// לפי כמות השארית אם לא מתחלק שורות נוספות של 3 כוכביות 
                    {
                    PrintSpaces(space);
                    Console.WriteLine("***");

                    }
                }
                for (int i = 0; i < numofnunmbers; i++)//לעבור כמספר המספרים האי זוגיים ולהדפיס מכל מספר לפי החלוקה 
                {
                    for (int j = 0; j < numbers; j++)// כמות השורות שנדפיס לכל מספר
                    {
                        PrintSpaces(space);
                        Console.WriteLine(str);
                    }
                    str += "**";
                    space -= 1;
                }


                //last line
                for (int i = 1; i <= width; i++)
                {
                    Console.Write("*");

                }
                Console.WriteLine();

         }
            static double CalculateRectanglePerimeter(double height, double width)
            {
                return 2 * (height + width);
            }
            static double CalculateRectangleArea(double height, double width)
            {
                return height * width;
            }
            static void CalculateRectangle()
            {
                double height, width, area, perimeter;

                Console.WriteLine("Enter the height of the tower");
                height = double.Parse(Console.ReadLine());
                Console.WriteLine("Enter the width of the tower");
                width = double.Parse(Console.ReadLine());

                if (Math.Abs(height - width) > 5)
                {
                    Console.WriteLine("The area of the rectangle tower is: {0}", CalculateRectangleArea(width, height));
                }
                else
                {
                    Console.WriteLine("The perimeter of the rectangle tower is: {0}", CalculateRectanglePerimeter(height, width));
                }
            }
            static double CalculateTrianglePerimeter(double height, double width)
            {
                double a = (double)(width) / 2;
                double c = Math.Sqrt(Math.Pow((a), 2) + Math.Pow(height, 2));
                double perimeter = ((c * 2) + width);
                return perimeter;
            }
            static void CalculateTriangle()
            {
                int num;
                double height, width, perimeter;

                Console.WriteLine("Enter the height of the tower");
                height = double.Parse(Console.ReadLine());
                Console.WriteLine("Enter the width of the tower");
                width = double.Parse(Console.ReadLine());
                Console.WriteLine("Enter 1 for calculating the perimeter of the triangle, 2 for printing the triangle");
                num = int.Parse(Console.ReadLine());

                switch (num)
                {
                    case 1:
                        Console.WriteLine("The perimeter of the triangle tower is: {0}", CalculateTrianglePerimeter(height, width));
                        break;

                    case 2:
                        if (width % 2 == 1 && width < 2 * height)
                        {
                            PrintTriangle((int)width, (int)height);
                        }
                        else
                        {
                            Console.WriteLine("There is no option to print the triangle.");
                        }
                        break;

                    default:
                        Console.WriteLine("Not a valid option.");
                        break;
                }
            }

            static void Main(string[] args)
            {
                Shape myVar;


                do
                {
                    Console.WriteLine("Enter 1 for a rectangle tower, 2 for a triangle tower, and 3 to exit");
                    myVar = (Shape)Convert.ToInt32(Console.ReadLine());

                    switch (myVar)
                    {

                        case Shape.Rectangle:
                            CalculateRectangle();
                            break;
                        case Shape.Triangle:
                            CalculateTriangle();
                            break;
                        case Shape.Exit:
                            Console.WriteLine("Exiting the program...");
                            break;
                        default:
                            Console.WriteLine("Invalid input. Please try again.");
                            break;
                    }
                } while (myVar != Shape.Exit);
            }

        }
    }



        
    










